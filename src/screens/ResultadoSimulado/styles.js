import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 20,
    gap: 20,
  },
  headerNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  scoreCard: {
    backgroundColor: theme.colors.navy,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.line,
    gap: 12,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.navy2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: theme.colors.lime,
  },
  scorePercentage: {
    color: theme.colors.lime,
    fontSize: 28,
    fontWeight: 'bold',
  },
  scoreSubtext: {
    color: theme.colors.muted,
    fontSize: 12,
  },
  scoreTitle: {
    color: theme.colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.navy2,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: theme.colors.line,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    color: theme.colors.muted,
    fontSize: 11,
  },
  sectionTitle: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  feedbackCard: {
    backgroundColor: theme.colors.navy,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.line,
    gap: 12,
  },
  disciplineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.line,
  },
  disciplineName: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  disciplineScore: {
    color: theme.colors.lime,
    fontSize: 14,
    fontWeight: 'bold',
  },
  btnPrimary: {
    backgroundColor: theme.colors.lime,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnPrimaryText: {
    color: '#112000',
    fontWeight: 'bold',
    fontSize: 15,
  },
  btnSecondary: {
    backgroundColor: theme.colors.navy2,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.line,
  },
  btnSecondaryText: {
    color: theme.colors.white,
    fontWeight: '600',
    fontSize: 15,
  },
});