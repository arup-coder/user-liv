
import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
    loadTheme(platformSettings: any) {
        document.documentElement.style.setProperty('--primaryColor', platformSettings.generalSetting.primaryColor);
        document.documentElement.style.setProperty('--secondaryColor', platformSettings.generalSetting.secondaryColor);
        document.documentElement.style.setProperty('--linkColor', platformSettings.generalSetting.linkColor);
        document.documentElement.style.setProperty('--secondaryTextColor', platformSettings.generalSetting.secondaryTextColor);
        document.documentElement.style.setProperty('--primaryTextColor', platformSettings.generalSetting.primaryTextColor);
        document.documentElement.style.setProperty('--primaryButtonColor', platformSettings.generalSetting.primaryButtonColor);
        document.documentElement.style.setProperty('--primaryButtonBg', platformSettings.generalSetting.primaryButtonBg);
        document.documentElement.style.setProperty('--secondaryButtonColor', platformSettings.generalSetting.secondaryButtonColor);
        document.documentElement.style.setProperty('--secondaryButtonBg', platformSettings.generalSetting.secondaryButtonBg);
        document.documentElement.style.setProperty('--accentButtonColor', platformSettings.generalSetting.accentButtonColor);
        document.documentElement.style.setProperty('--accentButtonBg', platformSettings.generalSetting.accentButtonBg);
        document.documentElement.style.setProperty('--topNavColor', platformSettings.generalSetting.topNavColor);
        document.documentElement.style.setProperty('--hamburgerBtnColor', platformSettings.generalSetting.hamburgerBtnColor);
        document.documentElement.style.setProperty('--pageTitleColor', platformSettings.generalSetting.pageTitleColor);
        document.documentElement.style.setProperty('--navigationLinkColor', platformSettings.generalSetting.navigationLinkColor);
        document.documentElement.style.setProperty('--navGrad1', platformSettings.generalSetting.navGrad1);
        document.documentElement.style.setProperty('--navGrad2', platformSettings.generalSetting.navGrad2);
    }
}