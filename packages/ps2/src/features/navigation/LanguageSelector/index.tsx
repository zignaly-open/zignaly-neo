import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { Typography } from '@zignaly-open/ui';
import {
  Layout,
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
  const [isExpanded, setIsExpanded] = useState(false);

  const theme = useTheme() as Theme;

  const languageMap = supportedLocales
    ? supportedLocales.map((x) => LocalizationLanguages[x])
    : Object.values(LocalizationLanguages);

  const handleSelectLanguage = (locale: string) => {
    setIsExpanded(false);
    onSelectLocale(locale);
    // TODO: change language
  };

  if (languageMap.length === 1) return null;

  return (
    <Layout isActive={isExpanded}>
      <Button
        isMenu={languageMap.length > 1}
        onClick={() => setIsExpanded((x) => !x)}
      >
        <Field>
          <GlobeLanguagesStyled
            color={theme.neutral300}
            width={'26px'}
            height={'26px'}
          />
          <LabelButton variant={'body1'} color={'neutral400'}>
            {LocalizationLanguages[selectedLocale]?.label}
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
      {isExpanded && (
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
      )}
    </Layout>
  );
}

export default LanguageSelector;
