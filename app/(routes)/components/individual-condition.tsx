import { formattedCurrentData } from "@/types";
import ValueCondition from "./value-condition";

interface IndividualConditionProps{
    value: { key: string; value: string | number }[]
}

const IndividualCondition: React.FC<IndividualConditionProps> = ({
    value
}) => {
    
    const am = [1,2,3,4,5,6,7,8,9,10,11,12];
    const currentStatus = Number(new Date().getHours().toFixed());

    return(
        <div className="flex flex-col">
            <h1 className={`${am.includes(currentStatus)? 'text-[#c4cad3]' : 'text-[#c4cad3]'} font-semibold text-sm`}>CONDITION</h1>
            <div className="grid grid-cols-2 lg:grid-cols-3 w-ful gap-4 mt-4">
                {value?.map((item,index) => (
                    <ValueCondition key={index} value={item} />
                ))}
            </div>
        </div>
    )
}

export default IndividualCondition;