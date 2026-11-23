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
  header: {
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
  headerText: {
    flex: 1,
  },
  title: {
    color: theme.colors.white,
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 13,
    marginTop: 2,
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
  courseInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lessonCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    color: theme.colors.muted,
    fontSize: 12,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: theme.colors.navy3,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.lime,
    borderRadius: 3,
  },
  accessButton: {
    backgroundColor: theme.colors.lime,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  accessButtonText: {
    color: '#112000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyCard: {
    backgroundColor: theme.colors.navy,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.line,
    gap: 12,
  },
  emptyText: {
    color: theme.colors.muted,
    fontSize: 14,
  },
  errorText: {
    color: theme.colors.red,
    fontSize: 14,
  },
  linkText: {
    color: theme.colors.lime,
    fontWeight: '600',
  },
});
