// rsfp
import React from 'react';
import PropTypes from 'prop-types';
import AlbumList from './components/AlbumList';

AlbumFeature.propTypes = {

};

function AlbumFeature(props) {
    const albumList = [
        {
            id: 1,
            name: 'VIETNAM hot hit',
            thumbnailUrl: 'https://photo-zmp3.zmdcdn.me/banner/8/b/6/1/8b6110aa6cddbece7565ba0168f3ea72.jpg'
        },
        {
            id: 2,
            name: 'Đỉnh cao trending',
            thumbnailUrl: 'https://photo-zmp3.zmdcdn.me/banner/1/e/d/4/1ed445615d7119557c913c2c2cb31b2e.jpg'
        },
        {
            id: 3,
            name: 'Người mẹ nghèo',
            thumbnailUrl: 'https://photo-zmp3.zmdcdn.me/banner/2/6/d/a/26da75299c983f070d4fab1e70357104.jpg'
        },
    ];
    return (
        <div>
            <h2>Có thể bạn sẽ thích đấy</h2>
            <AlbumList albumList={albumList} />
        </div>
    );
}

export default AlbumFeature;