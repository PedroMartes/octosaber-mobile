import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 24,
    justifyContent: 'center',
    flex: 1,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.lime,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: theme.colors.lime,
    fontWeight: '900',
    fontSize: 18,
  },
  brandTitle: {
    color: theme.colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.white,
    marginBottom: 8,
  },
  heroSubtitle: {
    color: theme.colors.muted,
    fontSize: 14,
    marginBottom: 24,
  },
  tabs: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: theme.colors.navy2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.line,
  },
  tabActive: {
    borderColor: theme.colors.lime,
  },
  tabText: {
    color: theme.colors.white,
    fontWeight: '600',
  },
  tabTextActive: {
    color: theme.colors.lime,
  },
  form: {
    gap: 6,
  },
  label: {
    color: theme.colors.muted,
    fontSize: 12,
    marginTop: 6,
  },
  input: {
    backgroundColor: theme.colors.navy2,
    borderWidth: 1,
    borderColor: theme.colors.line,
    borderRadius: 10,
    padding: 14,
    color: theme.colors.white,
  },
  btnPrimary: {
    backgroundColor: theme.colors.lime,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  btnPrimaryText: {
    color: '#112000',
    fontWeight: '800',
    fontSize: 16,
  },
});