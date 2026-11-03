import { defineStore } from 'pinia';
import { LOCAL_KEY_USERINFO, THEME_KEY } from '@/constants';
import { getUserInfo } from '@/server/github';

export const useUserStore = defineStore('userinfo', {
  state: () => ({
    token: '',
    userinfo: {},
    htmlFontSize: 16,
    lang: 'zh',
    theme: 'light',
  }),

  actions: {
    async resolveUserinfo() {
      let localUserinfo = localStorage.getItem(LOCAL_KEY_USERINFO);
      if (localUserinfo) {
        localUserinfo = JSON.parse(localUserinfo);
        Object.assign(this.userinfo, localUserinfo);
        return;
      }

      const userinfo = await getUserInfo();
      localStorage.setItem(LOCAL_KEY_USERINFO, JSON.stringify(userinfo));
      Object.assign(this.userinfo, userinfo);
    },

    applyTheme(theme) {
      this.theme = theme;
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },

    toggleTheme() {
      const next = this.theme === 'light' ? 'dark' : 'light';
      this.theme = next;
      localStorage.setItem(THEME_KEY, next);
      this.applyTheme(next);
    },
  },
});
