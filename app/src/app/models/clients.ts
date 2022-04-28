
export interface clients{
    id : number,
    nom : string,
    prenom : string,
    montant : number,
    delai_paiement : number,
    date_echeance : Date,
    action? : string,
    mode_reglement  :string,
    retard_paiement? : number,
    date_second_relance? : Date,
    penalite? : number,
    commentaire? : string,
    created_at : string,
    updated_at : string,
}