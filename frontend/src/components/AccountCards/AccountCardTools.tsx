import PersonalAccount from "../../pages/PersonalAccount";

interface PersonalCardLinks {
    name: string;
    path: string
}

export const personalCardLinksData: (viewPath: string, accountId: string) => PersonalCardLinks[] =
(viewPath, accountId) => {
    return [
        {
            name: "View",
            path: viewPath
        },
        
        {
            name: "Deposit",
            path: `../personal-account/${accountId}` == viewPath? `../deposit/${accountId}` : `deposit/${accountId}`
        },
        
        {
            name: "Widthdraw",
            path: `../personal-account/${accountId}` == viewPath? `../deposit/${accountId}` : `deposit/${accountId}`
        }
    ];
};