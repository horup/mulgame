export interface SetSize
{
    size:number;
}

export interface Thing
{
    id:string;
    x:number;
    y:number;
}

export interface SetThing extends Thing
{
}


export interface Msg
{
    setSize?:SetSize;
    setThing?:SetThing;
}