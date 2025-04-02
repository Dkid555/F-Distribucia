import { MenuIcon } from "lucide-react-native"
import { Button } from "native-base"
import React from "react"

interface MenuButtonProps {
    size: number,
    onPress: any
}

const MenuButton:React.FC<MenuButtonProps> = ({size, onPress}) => {
    return(
        <Button style = {{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor:'transparent'}} onPress={onPress}>
            <MenuIcon size={size}/>
        </Button>
    )
}

export default MenuButton