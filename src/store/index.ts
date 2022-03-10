import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { defineStore } from "pinia";

interface State {
  user: User | null;
  userId: string | null;
}

export const useMainStore = defineStore("main", {
  state: (): State => {
    return {
      user: null,
      userId: null,
    };
  },
  actions: {
    setUser(user: User) {
      this.user = user;
      this.userId = user.uid;
    },
    unsetUser() {
      this.user = null;
      this.userId = null;
    },
    async bindUser(): Promise<void> {
      return new Promise((resolve, reject) => {
        onAuthStateChanged(
          getAuth(),
          (user) => {
            if (user) {
              this.setUser(user);
            } else {
              this.unsetUser();
            }
            resolve();
          },
          () => {
            console.log("error in binding user");
            reject();
          }
        );
      });
    },
  },
  getters: {
    isUserAuthenticated(): boolean {
      return this.userId === null ? false : true;
    },
  },
});
