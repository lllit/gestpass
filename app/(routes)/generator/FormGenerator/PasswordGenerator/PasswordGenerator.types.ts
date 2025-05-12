import { Dispatch, SetStateAction } from "react"

export type PasswordGeneratorProps = {
    setLengthPassword: Dispatch<SetStateAction<number>>
    LengthPassword: number,
    isMayusSelected: boolean,
    setIsMayusSelected: Dispatch<SetStateAction<boolean>>
    isMinusSelected: boolean,
    setIsMinusSelected: Dispatch<SetStateAction<boolean>>
    isSpecialCharacters:boolean,
    setIsSpecialCharacters: Dispatch<SetStateAction<boolean>>
    isNumberSelected:boolean
    setIsNumberSelected: Dispatch<SetStateAction<boolean>>
}