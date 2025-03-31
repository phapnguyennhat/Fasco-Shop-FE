import { TIME_CACHE } from '@/app/common/constant';
import { fetcher, isErrorResponse } from '@/lib/utils';

export const getProvinces = async () => {
	try {
		const provinces = await fetcher<IProvince[]>('province', {
			method: 'GET',
			next: {
				revalidate: TIME_CACHE,
			},
		});
		if (isErrorResponse(provinces)) {
			return [];
		}
		return provinces;
	} catch (error) {
		return [];
	}
};


export const getProvinceById = async(id: string|undefined) =>{ 
    if(!id){
        return undefined
    }
    try {
        const province = await fetcher<IProvince>(`province/${id}`,{
            method:'GET',
            next: {
                revalidate: TIME_CACHE
            }
        })
        if(isErrorResponse(province)){
            return undefined
        }
        return province
    } catch (error) {
        return undefined
    }
}

export const getDistrictById = async (
	provinceId: string | undefined,
	id: string | undefined,
) => {
	if (!id) {
		return undefined;
	}
	if (!provinceId) {
		return undefined;
	}

	try {
		const province = await fetcher<IDistrict>(
			`province/${provinceId}/district/${id}`,
			{
				method: 'GET',
				next: {
					revalidate: TIME_CACHE,
				},
			},
		);
		if (isErrorResponse(province)) {
			return undefined;
		}
		return province;
	} catch (error) {
		return undefined;
	}
};