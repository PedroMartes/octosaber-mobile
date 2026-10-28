import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: theme.colors.navy2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.line,
  },
  headerTitleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  subtitle: {
    fontSize: 13,
    color: theme.colors.muted,
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.navy,
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: theme.colors.line,
  },
  searchInput: {
    flex: 1,
    color: theme.colors.white,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 15,
  },
  card: {
    backgroundColor: theme.colors.navy,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.line,
  },
  cardInfo: {
    flex: 1,
    paddingRight: 12,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.navy2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: theme.colors.line,
  },
  badgeText: {
    color: theme.colors.lime,
    fontSize: 11,
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.white,
  },
  cardMeta: {
    fontSize: 13,
    color: theme.colors.muted,
    marginTop: 4,
  },
  readButton: {
    backgroundColor: theme.colors.lime,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  readButtonText: {
    color: theme.colors.background,
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    color: theme.colors.muted,
    marginTop: 30,
    fontSize: 14,
  },
});