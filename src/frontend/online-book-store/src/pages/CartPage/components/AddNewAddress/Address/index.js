import { useState, useEffect } from 'react';
import request from '~/utils/request';

export const Locations = () => {
    const [currentCountry, setCurrentCountry] = useState({});
    const [currentCities, setCurrentCities] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await request.get('address/show_all_countries');

                if (response.status === 200) {
                    setCurrentCountry(response.data[0]);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchCountries();
    }, []);

    useEffect(() => {
        const fetchCities = async () => {
            if (currentCountry.id) {
                try {
                    const citiesResponse = await request.get(
                        `address/show_all_provinces?country_id=${currentCountry.id}`,
                    );

                    if (citiesResponse.status === 200) {
                        setCurrentCities(citiesResponse.data);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        };

        fetchCities();
    }, [currentCountry]);

    return { currentCities };
};
