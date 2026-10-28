import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    content: {
        padding: 20,
        gap: 16,
    },
    headerNav: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 4,
    },
    backButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: theme.colors.navy2,
        borderWidth: 1,
        borderColor: theme.colors.line,
    },
    headerTitle: {
        color: theme.colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitle: {
        color: theme.colors.muted,
        fontSize: 14,
        marginBottom: 8,
    },
    certCard: {
        backgroundColor: theme.colors.navy,
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: theme.colors.line,
        gap: 12,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 1,
    },
    badgeIssued: {
        backgroundColor: theme.colors.navy2,
        borderColor: theme.colors.lime,
    },
    badgeProgress: {
        backgroundColor: theme.colors.navy2,
        borderColor: theme.colors.line,
    },
    badgeTextIssued: {
        color: theme.colors.lime,
        fontSize: 11,
        fontWeight: '600',
    },
    badgeTextProgress: {
        color: theme.colors.muted,
        fontSize: 11,
        fontWeight: '600',
    },
    certTitle: {
        color: theme.colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    certMeta: {
        color: theme.colors.muted,
        fontSize: 12,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: theme.colors.line,
    },
    btnDownload: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: theme.colors.lime,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
    },
    btnDownloadText: {
        color: '#112000',
        fontWeight: 'bold',
        fontSize: 13,
    },
    progressText: {
        color: theme.colors.lime,
        fontSize: 13,
        fontWeight: 'bold',
    },
});