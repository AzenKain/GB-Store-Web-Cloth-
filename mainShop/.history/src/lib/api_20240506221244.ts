import { Backend_URL } from "./Constants";
import { CreateOtpDto, SignUpDto, VerifyOtpDto } from "./dtos/auth";
import { UpdateCartDto } from "./dtos/cart";
import { EditProfileDto } from "./dtos/user";

async function refreshTokenApi(refreshToken: string): Promise<string | null> {
    try {
        const response = await fetch(Backend_URL + "/auth/refreshToken", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${refreshToken}`
            },
        });

        if (response.status === 200)  {
            const data = await response.json();
            return data.access_token;
        } else {
            console.error("Failed to refresh access token:", response.statusText);
            return null;
        }
    } catch (error) {
        console.error("Error while refreshing access token:", error);
        return null;
    }
}

export async function makeRequestApi(callback: Function, dto: any, refreshToken: string | undefined, accessToken: string | undefined) {
    try {
        if (accessToken == undefined) return null;
        const data = await callback(dto, accessToken);
        
        if (data == null && refreshToken !== undefined) {
            const newAccessToken = await refreshTokenApi(refreshToken);

            if (newAccessToken) {
                return await callback(dto, newAccessToken);
            } else {
                console.log('Unauthorized!');
                return null;
            }
        } else {
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getAllRoomchatApi(userId: string, accessToken: string) {
    console.log(userId)
    const res = await fetch(Backend_URL + `/roomchat/all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
    });
    if (res.status == 401) {
        console.log(res.statusText);
        return null;
    }
    return await res.json();
}

export async function getUserDetailApi(idx : null, accessToken: string) {
    const res = await fetch(Backend_URL + `/user/detail`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
    });
    if (res.status == 401) {
        console.log(res.statusText);
        return null;
    }
    return await res.json();
}

export async function editUserDetailApi(dto : EditProfileDto, accessToken: string) {
    const res = await fetch(Backend_URL + `/user/edit`, {
        method: "PATCH",
        body: JSON.stringify({
            ...dto
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
    });
    if (res.status == 401) {
        console.log(res.statusText);
        return null;
    }
    return await res.json();
}

export async function createOtpApi(dto: CreateOtpDto) {
    const res = await fetch(Backend_URL + "/auth/createOtp", {
        method: "POST",
        body: JSON.stringify({
            ...dto
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.status == 401) {
        console.log(res.statusText);
        return null;
    }
    return await res.json();
}

export async function verifyOtpApi(dto: VerifyOtpDto) {
    const res = await fetch(Backend_URL + "/auth/verifyOtp", {
        method: "POST",
        body: JSON.stringify({
            ...dto
        }),
        headers: {
            "Content-Type": "application/json",

        },
    });
    if (res.status == 401) {
        console.log(res.statusText);
        return null;
    }
    console.log(res)
    return await res.json();
}


export async function signUpApi(dto: SignUpDto) {
    const res = await fetch(Backend_URL + "/auth/signup", {
        method: "POST",
        body: JSON.stringify({
            ...dto
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.status == 401) {
        console.log(res.statusText);
        return null;
    }
    return await res.json();
}

export async function getAllProductApi() {
    const res = await fetch(Backend_URL + "/product/all", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.status == 401) {
        console.log(res.statusText);
        return null;
    }
    return await res.json();
}


export async function getProductByIdApi(productId: string) {
    const res = await fetch(Backend_URL + `/product/id/${productId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.status == 401) {
        console.log(res.statusText);
        return null;
    }
    return await res.json();
}

export async function updateCartApi(dto: UpdateCartDto, accessToken: string) {
    const res = await fetch(Backend_URL + "/cart/update", {
        method: "PATCH",
        body: JSON.stringify({
            ...dto
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
    });
    if (res.status == 401) {
        console.log(res.statusText);
        return null;
    }
    return await res.json();
}

export async function getCartDetailApi(idx : null, accessToken: string) {
    const res = await fetch(Backend_URL + `/cart/detail`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
    });
    if (res.status == 401) {
        console.log(res.statusText);
        return null;
    }
    return await res.json();
}

export async function addHeartApi(productId: string, accessToken: string) {
    const res = await fetch(Backend_URL + `/user/add-heart`, {
        method: "PUT",
        body: JSON.stringify({
            productId: productId
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
    });
    if (res.status == 401) {
        console.log(res.statusText);
        return null;
    }
    return await res.json();
}

export async function removeHeartApi(productId: string, accessToken: string) {
    const res = await fetch(Backend_URL + `/user/remove-heart`, {
        method: "PUT",
        body: JSON.stringify({
            productId: productId
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
    });
    if (res.status == 401) {
        console.log(res.statusText);
        return null;
    }
    return await res.json();
}

export async function getTopProductApi(top: string, quantity: number) {
    const res = await fetch(Backend_URL + `/product/top?top=hot-sales&quantity=${}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.status == 401) {
        console.log(res.statusText);
        return null;
    }
    return await res.json();
}