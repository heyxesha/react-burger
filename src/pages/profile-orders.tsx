import { useEffect } from 'react';
import { useDispatch, useSelector } from '../store';
import { feedConnect } from '../services/actions/feed';
import Cookies from 'universal-cookie';

import { updateToken } from '../services/actions/auth';
import { feedDisconnect } from '../services/actions/feed';
import ProfilePageWrapper from '../components/profile-page-wrapper/profile-page-wrapper';
import Feed from '../components/feed/feed';

import IActionResponseData from '../interfaces/action-response-data';

const ProfileOrdersPage = () => {
    const dispatch = useDispatch();

    const connectToSocket = (token: string) => {
        const accessToken = token.split('Bearer ')[1];
        dispatch(feedConnect(`wss://norma.nomoreparties.space/orders?token=${accessToken}`));

        return () => {
            dispatch(feedDisconnect());
        };
    };

    useEffect(() => {
        const cookies = new Cookies();
        const accessToken: string | undefined = cookies.get('accessToken');
        if (accessToken) {
            connectToSocket(accessToken);
        } else {
            dispatch(updateToken(cookies.get('refreshToken'))).then((res: IActionResponseData) => {
                if (res.success && res.accessToken) {
                    connectToSocket(res.accessToken);
                } else {
                    alert(res.error);
                }
            }).catch((error: Error) => alert(error));
        }
        
        return () => {
        };
    }, []);
    const { orders } = useSelector(state => state.feed);
    return (
        <ProfilePageWrapper activeTab="orders">
            <Feed
                orders={ orders }
                showStatus={ true }/>
        </ProfilePageWrapper>
    );
};

export default ProfileOrdersPage;