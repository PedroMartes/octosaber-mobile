import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 20,
    gap: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.navy2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.line,
  },
  greeting: {
    color: theme.colors.muted,
    fontSize: 12,
  },
  userName: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.navy,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.line,
    alignItems: 'center',
    gap: 6,
  },
  statValue: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: theme.colors.muted,
    fontSize: 12,
  },
  sectionTitle: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  continueCard: {
    backgroundColor: theme.colors.navy2,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.line,
    gap: 12,
  },
  continueTag: {
    color: theme.colors.lime,
    fontSize: 12,
    fontWeight: '600',
  },
  continueCourseTitle: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: theme.colors.navy3,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.lime,
    width: '65%', // 65% concluído
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridCard: {
    width: '48%',
    backgroundColor: theme.colors.navy,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.line,
    alignItems: 'flex-start',
    gap: 12,
  },
  gridTitle: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});