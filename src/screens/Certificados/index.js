import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ArrowLeft, Award, Download } from 'lucide-react-native';
import { theme } from '../../styles/theme';
import { getAssetUrl, getCertificates } from '../../services/api';
import { styles } from './styles';

export default function CertificadosScreen({ navigation }) {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    getCertificates()
      .then((data) => {
        if (active) setCertificates(data);
      })
      .catch((loadError) => {
        if (active) setError(loadError.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function handleDownload(certificate) {
    const url = getAssetUrl(certificate.url_certificado);
    if (!url) {
      setError('Este certificado ainda não possui um arquivo disponível.');
      return;
    }

    try {
      await Linking.openURL(url);
    } catch (openError) {
      setError(openError.message || 'Não foi possível abrir o certificado.');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerNav}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <ArrowLeft color={theme.colors.white} size={20} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Meus Certificados</Text>
        </View>

        <Text style={styles.subtitle}>
          Certificados emitidos para a sua conta.
        </Text>

        {loading ? <ActivityIndicator color={theme.colors.lime} /> : null}
        {error ? <Text style={{ color: theme.colors.red }}>{error}</Text> : null}
        {!loading && !error && certificates.length === 0 ? (
          <Text style={styles.subtitle}>Nenhum certificado disponível.</Text>
        ) : null}

        {certificates.map((item) => {
          const issued =
            String(item.status || '').toUpperCase() === 'EMITIDO' ||
            Boolean(item.url_certificado);
          const date = item.data_emissao
            ? String(item.data_emissao).split(' ')[0]
            : null;

          return (
            <View key={item.id_certificado} style={styles.certCard}>
              <View style={styles.cardHeader}>
                <Award
                  color={issued ? theme.colors.lime : theme.colors.muted}
                  size={24}
                />
                <View
                  style={[
                    styles.badge,
                    issued ? styles.badgeIssued : styles.badgeProgress,
                  ]}
                >
                  <Text
                    style={
                      issued ? styles.badgeTextIssued : styles.badgeTextProgress
                    }
                  >
                    {item.status || 'REGISTRADO'}
                  </Text>
                </View>
              </View>

              <View>
                <Text style={styles.certTitle}>
                  {item.titulo || item.curso || 'Certificado'}
                </Text>
                {item.carga_horaria ? (
                  <Text style={styles.certMeta}>
                    Carga horária: {item.carga_horaria} horas
                  </Text>
                ) : null}
                {item.codigo_validacao ? (
                  <Text style={styles.certMeta}>
                    Código: {item.codigo_validacao}
                  </Text>
                ) : null}
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.certMeta}>
                  {date ? `Emitido em: ${date}` : 'Data não informada'}
                </Text>
                {item.url_certificado ? (
                  <TouchableOpacity
                    style={styles.btnDownload}
                    onPress={() => handleDownload(item)}
                    activeOpacity={0.8}
                  >
                    <Download color="#112000" size={16} />
                    <Text style={styles.btnDownloadText}>Abrir certificado</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.certMeta}>Arquivo ainda não disponível</Text>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
