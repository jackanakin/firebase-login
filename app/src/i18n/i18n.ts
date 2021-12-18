import i18next from 'i18next';
import moment from "moment";

import { LanguagesInterface } from '../global/languages/LanguagesInterface';
import { PT_BR } from "./translations/pt-BR/pt_br"
import { EN } from "./translations/en/en"

export function init(language: LanguagesInterface): void {
    i18next.init({
        lng: language, // if you're using a language detector, do not define the lng option
        debug: false,
        resources: {
            en: {
                translation: EN
            },
            pt_br: {
                translation: PT_BR
            }
        },
        interpolation: {
            formatSeparator: ',',
            format: function (value, formatting, lng) {
                if (value instanceof Date) return moment(value).format(formatting);
                return value.toString();
            }
        }
    });
}