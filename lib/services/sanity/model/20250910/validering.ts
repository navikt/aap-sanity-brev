import { Rule } from '@sanity/types';

export const validerOversettelser = (rule: Rule): Rule =>
  rule.custom<{ value?: any; _type: string; _key: string }[] | undefined>((oversettelser) => {
    if (!oversettelser || oversettelser.length === 0) {
      return {
        message: 'Må ha minst en oversettelse',
      };
    }

    if (!oversettelser.every((oversettelse) => oversettelse.value)) {
      return {
        message: 'Alle valgte oversettelser må ha innhold',
      };
    }
    return true;
  });
