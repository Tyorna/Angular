export interface AuthD {
  accessToken: string;
    user: {
        id: number;
        email: string;
        name: string;
    };
}

/*Ha dentro l'oggetto utente, con dentro i parametri uguali all'user (ma senza la password, perchè quella non gira)
*/
