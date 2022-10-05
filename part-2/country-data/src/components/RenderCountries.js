import React from 'react';
import CountriesList from './CountriesList';
import MatchOverload from './MatchOverload';

const RenderCountries = ({searchData, search}) => {
    return (
        <div>
            {
                search ?
                    (
                        <div>
                            {searchData.length > 10 ?
                                (
                                    <div>
                                        <MatchOverload/>
                                        {/*{console.log(searchData)}*/}
                                    </div>
                                )
                                :
                                (
                                    <div>
                                        <CountriesList searchData={searchData}/>
                                        {/*{console.log(searchData)}*/}
                                    </div>
                                )
                            }
                        </div>
                    )
                    :
                    (
                        <div></div>
                    )
            }
        </div>
    );
};

export default RenderCountries;
