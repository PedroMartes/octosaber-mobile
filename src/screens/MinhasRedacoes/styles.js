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
  essayCard: {
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
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  statusBadgePending: {
    backgroundColor: theme.colors.navy2,
    borderColor: theme.colors.gold,
  },
  statusBadgeCompleted: {
    backgroundColor: theme.colors.navy2,
    borderColor: theme.colors.lime,
  },
  statusTextPending: {
    color: theme.colors.gold,
    fontSize: 11,
    fontWeight: '600',
  },
  statusTextCompleted: {
    color: theme.colors.lime,
    fontSize: 11,
    fontWeight: '600',
  },
  dateText: {
    color: theme.colors.muted,
    fontSize: 12,
  },
  essayTitle: {
    color: theme.colors.white,
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: theme.colors.line,
  },
  scoreInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  scoreLabel: {
    color: theme.colors.muted,
    fontSize: 12,
  },
  scoreValue: {
    color: theme.colors.lime,
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  btnDetailsText: {
    color: theme.colors.white,
    fontSize: 13,
    fontWeight: '600',
  },
});