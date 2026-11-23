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
  title: {
    color: theme.colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  myCoursesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: theme.colors.navy,
    borderWidth: 1,
    borderColor: theme.colors.line,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  myCoursesButtonText: {
    color: theme.colors.lime,
    fontSize: 12,
    fontWeight: '600',
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.navy,
    borderRadius: 12,
    paddingHorizontal: 14,
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
  emptyText: {
    color: theme.colors.muted,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 16,
  },
  courseCard: {
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
    backgroundColor: theme.colors.navy2,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: theme.colors.line,
  },
  badgeText: {
    color: theme.colors.lime,
    fontSize: 12,
    fontWeight: '600',
  },
  courseTitle: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  courseDescription: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 18,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: theme.colors.line,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    color: theme.colors.muted,
    fontSize: 12,
  },
  btnAccess: {
    backgroundColor: theme.colors.lime,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  btnAccessText: {
    color: '#112000',
    fontWeight: 'bold',
    fontSize: 13,
  },
});