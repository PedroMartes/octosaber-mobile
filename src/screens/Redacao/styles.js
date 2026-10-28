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
  promptCard: {
    backgroundColor: theme.colors.navy,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.line,
    gap: 10,
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
  promptTitle: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  promptDesc: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 18,
  },
  editorSection: {
    gap: 8,
  },
  editorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  counterText: {
    color: theme.colors.muted,
    fontSize: 12,
  },
  textArea: {
    backgroundColor: theme.colors.navy2,
    borderWidth: 1,
    borderColor: theme.colors.line,
    borderRadius: 10,
    padding: 14,
    color: theme.colors.white,
    minHeight: 220,
    textAlignVertical: 'top',
    fontSize: 14,
    lineHeight: 20,
  },
  btnSubmit: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: theme.colors.lime,
    padding: 14,
    borderRadius: 10,
    marginTop: 8,
  },
  btnSubmitDisabled: {
    opacity: 0.5,
  },
  btnSubmitText: {
    color: '#112000',
    fontWeight: '800',
    fontSize: 15,
  },
});