import PageTitle from "../components/PageTitle";
import NewsDiv from "../components/NewsDiv";
import React from "react";
import BreakLine from "../components/BreakLine";

import NewsImage from "../images/main-news.png"
import SmallNews from '../images/add-news.png'

export default function NewsPage(){
    const bigNews = Array(2).fill({
        image:NewsImage,
        text:"Star Wars: Knights of the Old Republic I and II available for free on the Epic Games Store on mobile",
        date: new Date('2025-02-27T17:00:00')
    })

    const smallNews = Array(8).fill({
        image:SmallNews,
        text:"SMITE 2 beginner's guide: Tips for understanding gods, roles, and teamwork",
        date: new Date('2025-02-27T17:00:00')

    })
    return(
        <div>
            <PageTitle title="Relevant news" />
            <div className="flex-col justify-between items-center mt-[31px] gap-5 hidden
             imd:flex
             xl:flex-row xl:gap-0">
                {bigNews.map((item, index) => (
                  <div key={index}>
                      <NewsDiv key={index} news={item} isBig={true} />
                  </div>
                ))}
            </div>
            <BreakLine mt={35} mb={35}/>

            <div className="flex justify-between w-full flex-wrap gap-y-7">
                {smallNews.map((item, index) => (
                    <div className="flex flex-col" key={index}>
                        <NewsDiv key={index} news={item} isBig={false} />
                    </div>
                ))}
            </div>
        </div>
    )
}