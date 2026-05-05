export type Link = {
    id: string,
    ref: string,
    label: string
};

export const links: Link[] = [
    { id: 'link1', ref: "/", label: "Home" },
    { id: 'link2', ref: "/multifiles", label: "Multi Files" },
    /*{ id: 'link3', ref: "/#", label: "Multi Files" },
    { id: 'link4', ref: "/#", label: "Multi Files" },
    { id: 'link5', ref: "/#", label: "Multi Files" },
    { id: 'link6', ref: "/#", label: "Multi Files" },
    { id: 'link7', ref: "/#", label: "Multi Files" },
    { id: 'link8', ref: "/#", label: "Multi Files" },
    { id: 'link9', ref: "/#", label: "Multi Files" },*/    
];