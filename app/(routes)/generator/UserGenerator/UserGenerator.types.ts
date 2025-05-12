import { Dispatch, SetStateAction } from "react"

export type UserGeneratorProps = {
    setUserTypeSelected: Dispatch<SetStateAction<string>>
}