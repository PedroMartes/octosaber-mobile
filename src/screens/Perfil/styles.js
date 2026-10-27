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
  header: {
    alignItems: 'center',
    paddingVertical: 16,
    gap: 10,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.navy2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.lime,
  },
  userName: {
    color: theme.colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  badge: {
    backgroundColor: theme.colors.navy2,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.line,
  },
  badgeText: {
    color: theme.colors.lime,
    fontSize: 12,
    fontWeight: '600',
  },
  sectionTitle: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  menuGroup: {
    backgroundColor: theme.colors.navy,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.line,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.line,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemText: {
    color: theme.colors.white,
    fontSize: 15,
    fontWeight: '500',
  },
  btnLogout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: theme.colors.navy2,
    borderWidth: 1,
    borderColor: theme.colors.red,
    borderRadius: 10,
    padding: 14,
    marginTop: 8,
  },
  btnLogoutText: {
    color: theme.colors.red,
    fontWeight: 'bold',
    fontSize: 15,
  },
});