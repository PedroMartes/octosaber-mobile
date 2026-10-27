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
    marginBottom: 8,
  },
  title: {
    color: theme.colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 14,
  },
  card: {
    backgroundColor: theme.colors.navy,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.colors.line,
    gap: 16,
  },
  badgeContainer: {
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
  xpText: {
    color: theme.colors.gold,
    fontSize: 13,
    fontWeight: 'bold',
  },
  enunciado: {
    color: theme.colors.white,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
  optionsContainer: {
    gap: 10,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.navy2,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: theme.colors.line,
    gap: 12,
  },
  optionSelected: {
    borderColor: theme.colors.lime,
    backgroundColor: theme.colors.navy3,
  },
  optionLetter: {
    color: theme.colors.muted,
    fontWeight: 'bold',
    fontSize: 14,
    width: 20,
  },
  optionLetterSelected: {
    color: theme.colors.lime,
  },
  optionText: {
    color: theme.colors.white,
    fontSize: 14,
    flex: 1,
  },
  btnConfirmar: {
    backgroundColor: theme.colors.lime,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  btnConfirmarDisabled: {
    opacity: 0.5,
  },
  btnConfirmarText: {
    color: '#112000',
    fontWeight: '800',
    fontSize: 15,
  },
});