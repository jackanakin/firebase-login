import React, { useContext, useEffect, useState } from 'react';
import {
    Alert,
    Dimensions,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { ThemeContext } from 'styled-components';
import { GiftedChat } from 'react-native-gifted-chat';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import { ThemeOptions } from '../../global/theme/_ts/ThemeOptions';
import { useSignIn } from '../../hooks/public/signin';
import LoadingScreen from '../public/LoadingScreen';
import { PublicProfileProvider } from '../../types/firestore/provider/PublicProfileProvider';
import { Chat } from '../../types/firestore/messaging/Chat';
import { UserHasRelationCollection } from '../../types/firestore/users/relations/UserHasRelation';
import { UserRelation, UserRelationCollection } from '../../types/firestore/users/relations/UserRelation';
import { ChatNotBelongToUsersError, ChatReferenceNull } from '../../codes/ErrorCodes';
import { MessagesCollection } from '../../types/firestore/messaging/Message';

interface RouteProps {
    route: {
        params: {
            relation: PublicProfileProvider;
        }
    };
}

const ChatScreen: React.FC<RouteProps> = ({ route }) => {
    const relation = route.params.relation;
    const { user } = useSignIn();
    const { goBack } = useNavigation();
    const theme = useContext(ThemeContext) as ThemeOptions;

    const [messages, setMessages] = useState<any>([]);
    const [chatReference, setChatReference] = useState<Chat | null>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setMessages([]);
    }, []);

    function onSend(messages = []) {
        if (!chatReference) {
            Alert.alert("", ChatReferenceNull);
            return;
        }

        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        const {
            _id,
            createdAt,
            text,
            user,
        } = messages[0];
        chatReference.collection(MessagesCollection).add({
            _id,
            createdAt,
            text,
            user
        });
    }

    async function loadChat(): Promise<(() => void) | null> {
        const userRelation = (await firestore()
            .collection(UserHasRelationCollection).doc(user?.uid)
            .collection(UserRelationCollection).doc(relation.owner_uid).get()).data() as UserRelation;
        const chatReference = userRelation.Chat;
        const chatData = (await chatReference.get()).data() as Chat;

        if (chatData) {
            const iStarted = chatData.usera === user?.uid;
            const heStarted = chatData.usera === relation.owner_uid;
            if (iStarted === heStarted) {
                Alert.alert("", ChatNotBelongToUsersError);
                setError(true);
                return null;
            }

            setChatReference(chatReference);
            const unsubscribe = chatReference.collection(MessagesCollection)
                .orderBy('createdAt', 'desc')
                .onSnapshot(snap => {
                    setMessages(
                        snap.docs.map(doc => ({
                            _id: doc.data()._id,
                            createdAt: doc.data().createdAt.toDate(),
                            text: doc.data().text,
                            user: doc.data().user,
                        }))
                    );
                });
            return unsubscribe;
        } else {
            console.log("no chat");
        }

        return null;
    }

    useEffect(() => {
        loadChat().then(reference => {
            setLoading(false);
            if (reference) {
                return reference;
            }
        });
    }, []);

    return (
        <View style={styles.container}>
            <Text>{relation.name} - {relation.city}</Text>
            {
                (loading) ? <LoadingScreen />
                    :
                    <GiftedChat
                        alwaysShowSend
                        scrollToBottom
                        messagesContainerStyle={{ backgroundColor: '#ccc' }}
                        messages={messages} renderAvatar={null}
                        onSend={messages => onSend(messages)}
                        user={{
                            _id: user?.uid ? user?.uid : "undefined",
                        }}
                    />
            }
        </View>
    );
};
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    video: {
        width: width / 1.5,
        height: 150,
        margin: 13,
        borderRadius: 13,
    },
});

export default ChatScreen;