import React from 'react';
import { useTheme } from 'styled-components';
import { DropDown, Typography } from '@zignaly-open/ui';
import {
  Field,
  Button,
  Container,
  Item,
  LabelButton,
  ArrowBottomIconStyled,
  GlobeLanguagesStyled,
} from './styles';
import { LanguageSelectorProps } from './types';
import { LocalizationLanguages } from './constants';
import Theme from '@zignaly-open/ui/lib/theme/theme';

// TODO: put this to zignaly-ui but we rely on locales here
function LanguageSelector({
  supportedLocales,
  selectedLocale,
  onSelectLocale,
}: LanguageSelectorProps) {
  const theme = useTheme() as Theme;

  const languageMap = supportedLocales
    ? supportedLocales.map((x) => LocalizationLanguages[x])
    : Object.values(LocalizationLanguages);

  const handleSelectLanguage = (locale: string) => {
    onSelectLocale(locale);
  };

  if (languageMap.length === 1) return null;

  return (
    <DropDown
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      content={
        <Container>
          {languageMap.map((language) => (
            <Item
              key={'--language-' + language.locale}
              onClick={() => handleSelectLanguage(language.locale)}
            >
              <Typography
                variant={'body1'}
                color={
                  selectedLocale === language.locale
                    ? 'highlighted'
                    : 'neutral200'
                }
              >
                {language.label}
              </Typography>
            </Item>
          ))}
        </Container>
      }
      component={({ open }) => (
        <Button isFocused={open} isMenu={languageMap.length > 1}>
          <Field>
            <GlobeLanguagesStyled
              color={theme.neutral300}
              width={'26px'}
              height={'26px'}
            />
            <LabelButton variant={'body1'} color={'neutral400'}>
              {LocalizationLanguages[selectedLocale?.split('_')[0]]?.label}
            </LabelButton>
          </Field>
          {languageMap.length > 1 && (
            <ArrowBottomIconStyled
              color={theme.neutral300}
              width={'22px'}
              height={'22px'}
            />
          )}
        </Button>
      )}
    />
  );
}

export default LanguageSelector;
