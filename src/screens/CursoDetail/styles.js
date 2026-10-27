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
    marginBottom: 8,
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
  bannerCard: {
    backgroundColor: theme.colors.navy,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.colors.line,
    gap: 12,
  },
  badge: {
    alignSelf: 'flex-start',
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
    fontSize: 22,
    fontWeight: 'bold',
  },
  courseDesc: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  sectionTitle: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  aulaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.navy2,
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.line,
    marginBottom: 10,
  },
  aulaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  aulaNumber: {
    color: theme.colors.muted,
    fontWeight: 'bold',
    fontSize: 14,
    width: 24,
  },
  aulaTitle: {
    color: theme.colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
  aulaDuration: {
    color: theme.colors.muted,
    fontSize: 12,
    marginTop: 2,
  },
});