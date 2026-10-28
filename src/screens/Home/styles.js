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

  /* Card Hero (Desktop Banner) */
  heroCard: {
    backgroundColor: theme.colors.navy2,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.colors.line,
    gap: 16,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.navy,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: theme.colors.line,
  },
  heroBadgeText: {
    color: theme.colors.lime,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  heroTitle: {
    color: theme.colors.white,
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  heroSubtitle: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 18,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 10,
  },
  heroPrimaryButton: {
    flex: 1,
    backgroundColor: theme.colors.lime,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  heroPrimaryText: {
    color: theme.colors.background,
    fontWeight: 'bold',
    fontSize: 13,
  },
  heroSecondaryButton: {
    flex: 1,
    backgroundColor: theme.colors.navy,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.line,
    alignItems: 'center',
  },
  heroSecondaryText: {
    color: theme.colors.white,
    fontWeight: '600',
    fontSize: 13,
  },
  xpCard: {
    backgroundColor: theme.colors.navy,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: theme.colors.line,
    gap: 8,
  },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  xpLevel: {
    color: theme.colors.white,
    fontWeight: 'bold',
    fontSize: 13,
  },
  xpValue: {
    color: theme.colors.muted,
    fontSize: 11,
  },
  xpSubtext: {
    color: theme.colors.lime,
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'right',
  },

  /* Métrica de Sequência e XP */
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

  /* Seção e Títulos */
  sectionTitle: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metaBadge: {
    backgroundColor: theme.colors.navy2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: theme.colors.line,
  },
  metaBadgeText: {
    color: theme.colors.lime,
    fontSize: 10,
    fontWeight: 'bold',
  },

  /* Card "Seu dia" */
  dayCard: {
    backgroundColor: theme.colors.navy,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.line,
    gap: 14,
  },
  dayProgressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayProgressLabel: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  dayProgressValue: {
    color: theme.colors.lime,
    fontSize: 14,
    fontWeight: 'bold',
  },
  dayStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.line,
    gap: 6,
  },
  dayStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  dayStatValue: {
    color: theme.colors.white,
    fontSize: 11,
    fontWeight: 'bold',
  },
  dayStatLabel: {
    color: theme.colors.muted,
    fontSize: 10,
  },

  /* Em Andamento Card */
  continueCard: {
    backgroundColor: theme.colors.navy2,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.line,
    gap: 12,
    marginTop: 12,
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
  },

  /* Acesso Rápido Grid */
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
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