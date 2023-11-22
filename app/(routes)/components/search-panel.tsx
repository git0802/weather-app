"use client"

import { City } from "@/types";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface SearchPanelProps {
    onClick: (lat: number, lon: number) => void;
    isClicked: boolean;
    setisClicked: Dispatch<SetStateAction<boolean>>;
}

const SearchPanel: React.FC<SearchPanelProps> = ({
    onClick,
    isClicked,
    setisClicked
}) => {

    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState<City[]>([]);
    const am = [1,2,3,4,5,6,7,8,9,10,11,12];
    const currentStatus = Number(new Date().getHours().toFixed());

    useEffect(() => {
        const fetchData = async () => {
            if (searchText) {
              const searchUrl = 'search.json';
      
              try {
                const res = await axios.get(`//api.weatherapi.com/v1/${searchUrl}?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${searchText}&days=7`);
                setSearchResults(res.data); 
              } catch (error) {
                console.error('Error fetching data:', error);
              }
            } else {
              setSearchResults([]);
            }
          };
          fetchData();
    }, [searchText]);


    return(
        <div className="flex-col">
            <input className={`w-full hidden lg:flex lg:w-3/5 px-6 py-3 ${am.includes(currentStatus)? 'bg-[#202b3c] text-white' : 'bg-[#202b3c] text-white'}  text-xs rounded-xl outline-none`} 
                   placeholder="🔍 Search for cities..."
                   value={searchText}
                   onChange={(event) => setSearchText(event.target.value)}
                   onFocus={() => setisClicked(false)} />
            <div className={`absolute hidden ${am.includes(currentStatus)? 'bg-[#202b3c] border-white' : 'bg-[#202b3c] border-white'} lg:w-2/5 rounded-xl mt-4 border overflow-hidden ${searchResults.length === 0 ? 'hidden' : 'lg:flex' } ${isClicked === true ? `lg:hidden hidden` : ''}`}>
                <div className="my-4 w-full">
                    {searchResults.map((res) => (
                         <div key={res.id} onClick={() => onClick(res.lat,res.lon)} className={`p-1 ${am.includes(currentStatus)? 'text-white hover:bg-[#0B131E]' : 'text-white hover:bg-[#0B131E]'}  px-4`}>{res.name + ', ' + res.country}<span className={`${am.includes(currentStatus)? 'text-[#c4cad3]' : 'text-[#c4cad3]'} text-xs italic`}>{` Region: ${res.region}`}</span></div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SearchPanel;