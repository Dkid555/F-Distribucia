import React from "react";
import { useAppContext } from "../../Universal/API/Context-API/AppContext";
import { HStack, View, VStack } from "native-base";




interface BrandsWrappProps {
    children: any
}
const BrandsWrapp: React.FC<BrandsWrappProps> = ({ children }) => {
    const { isSmallVersion } = useAppContext()
    return (
        isSmallVersion ? <VStack>
            {children}

            <View height={100} />
        </VStack> : <HStack
            paddingTop="10px"
            width={900}
            flexWrap="wrap"
            justifyContent="center"
            alignItems="flex-start"
            paddingBottom={30}
        >

            {children}
        </HStack>
    )
}

export default React.memo(BrandsWrapp)