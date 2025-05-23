import PropTypes from 'prop-types';

PostList.propTypes = {
    posts: PropTypes.array,
};

PostList.defaultProps = {
    posts: [],
};

function PostList(props) {
    const { posts } = props;

    return (
        <ul className="post-list">
            {posts.map(post => (
                <li key={post.id}>
                    Title: {post.title}, Author: {post.author}
                </li>
            ))}
        </ul>
    );
}

export default PostList;