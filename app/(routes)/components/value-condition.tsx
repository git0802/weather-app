import { formattedCurrentData } from "@/types";

interface ValueConditionProps{
    value: { key: string; value: string | number }
}

const ValueCondition: React.FC<ValueConditionProps> = ({
    value
}) => {

    const am = [1,2,3,4,5,6,7,8,9,10,11,12];
    const currentStatus = Number(new Date().getHours().toFixed());

    return(
        <div className={`${am.includes(currentStatus)? 'bg-[#202b3c]' : 'bg-[#202b3c]'} rounded-xl p-5 space-y-6`}>
            <h1 className={`${am.includes(currentStatus)? 'text-[#c4cad3]' : 'text-[#c4cad3]'} text-1xl lg:text-md font-semibold`}>{value.key}</h1>
            <h1 className={`${am.includes(currentStatus)? 'text-white' : 'text-white'} font-bold lg:text-2xl`}>{value.value}</h1>
        </div>
    )
}

export default ValueCondition;