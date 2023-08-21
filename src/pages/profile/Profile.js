/**
 * Created by ljunb on 2016/12/9.
 * 我的
 */
import React, {PureComponent} from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image,
} from 'react-native'
import {Navigator} from 'react-native-deprecated-custom-components'
import {observer, inject} from 'mobx-react/native'

@inject('app')
@observer
export default class Profile extends PureComponent {

    _settingAction = () => alert('setting')

    _onLogin = () => {
        const {app, navigator} = this.props
        app.updateBarStyle('default')
        navigator.push({
            id: 'Login',
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
            passProps: {onResetBarStyle: ()=>app.updateBarStyle('light-content')}
        })
    }

    _onPressStaticCell = title => alert(title)

    render() {
        let cellStyle = {
            borderTopWidth: gScreen.onePix,
            borderBottomWidth: gScreen.onePix,
        }

        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                <HeaderView settingAction={this._settingAction} loginAction={this._onLogin}/>
                <View style={[styles.cellContainer, cellStyle]}>
                    <ProfileStaticCell
                        title="我的照片"
                        style={{borderBottomWidth: gScreen.onePix}}
                        imageName={require('../../resource/ic_my_photos.png')}
                        onPress={this._onPressStaticCell}
                    />
                    <ProfileStaticCell
                        title="我的收藏"
                        style={{borderBottomWidth: gScreen.onePix}}
                        imageName={require('../../resource/ic_my_collect.png')}
                        onPress={this._onPressStaticCell}
                    />
                    <ProfileStaticCell
                        title="上传食物数据"
                        imageName={require('../../resource/ic_my_upload.png')}
                        onPress={this._onPressStaticCell}
                    />
                </View>
            </View>
        )
    }
}

const HeaderView = ({settingAction, loginAction}) => {
    return (
        <Image
            style={{width: gScreen.width, height: 230, alignItems: 'center', backgroundColor: 'transparent'}}
            source={require('../../resource/img_my_head.png')}
        >
            <View style={[styles.header, {width: gScreen.width}]}>
                <Text style={{color: 'white', fontSize: 16}}>我的</Text>
                <TouchableOpacity
                    activeOpacity={0.75}
                    style={styles.settingContainer}
                    onPress={settingAction}
                >
                    <Image
                        style={{width: 20, height: 20}}
                        source={require('../../resource/ic_my_setting.png')}
                    />
                </TouchableOpacity>
            </View>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <View style={styles.avatarContainer}>
                    <Image
                        style={{width: 80, height: 80}}
                        source={require('../../resource/img_default_avatar.png')}
                    />
                </View>
                <TouchableOpacity
                    activeOpacity={0.75}
                    style={styles.loginContainer}
                    onPress={loginAction}
                >
                    <Text style={{color: 'white'}}>点击登录</Text>
                </TouchableOpacity>
            </View>
        </Image>
    )
};

const ProfileStaticCell = ({
    title,
    imageName,
    style,
    onPress
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={styles.staticCell}
            onPress={()=>onPress(title)}
        >
            <Image style={{width: 20, height: 20, marginHorizontal: 15}} source={imageName}/>
            <View style={[styles.cellStyle, style || style]}>
                <Text style={{color: 'gray'}}>{title}</Text>
                <Image style={{width: 20, height: 20}} source={require('../../resource/ic_my_right.png')}/>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    header: {
        height: __IOS__ ? 44 : 50,
        marginTop: __IOS__ ? 20 : 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    settingContainer: {
        height: __IOS__ ? 44 : 50,
        width: __IOS__ ? 44 : 50,
        position: 'absolute',
        top: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarContainer: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
    },
    loginContainer: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 2
    },
    cellContainer: {
        borderColor: '#d9d9d9',
        marginTop: 15,
        backgroundColor: 'white'
    },
    staticCell: {
        flexDirection: 'row',
        height: 46,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cellStyle: {
        flex: 1,
        height: 46,
        borderColor: '#d9d9d9',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 15
    }
});