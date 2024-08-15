
import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle, Flag } from 'lucide-react';

interface Comment {
  id: number;
  username: string;
  avatarUrl: string;
  content: string;
  likes: number;
  dislikes: number;
}

const CommentComponent: React.FC<{ comment: Comment }> = ({ comment }) => {
  const [likes, setLikes] = useState(comment.likes);
  const [dislikes, setDislikes] = useState(comment.dislikes);

  return (
    <div className="border-border dark:border-darkBorder shadow-light dark:shadow-dark rounded-base border-2 bg-bg dark:bg-darkBg p-4 mb-4">
      <div className="flex items-start">
        <img
          src={comment.avatarUrl}
          alt={`${comment.username}'s avatar`}
          className="w-10 h-10 rounded-full mr-4"
        />
        <div className="flex-grow">
          <h3 className="font-heading text-lg">{comment.username}</h3>
          <p className="text-text dark:text-darkText mt-2">{comment.content}</p>
          <div className="flex mt-4 space-x-4">
            <button
              onClick={() => setLikes(likes + 1)}
              className="flex items-center text-sm text-text dark:text-darkText hover:text-main"
            >
              <ThumbsUp className="w-4 h-4 mr-1" />
              {likes}
            </button>
            <button
              onClick={() => setDislikes(dislikes + 1)}
              className="flex items-center text-sm text-text dark:text-darkText hover:text-main"
            >
              <ThumbsDown className="w-4 h-4 mr-1" />
              {dislikes}
            </button>
            <button className="flex items-center text-sm text-text dark:text-darkText hover:text-main">
              <MessageCircle className="w-4 h-4 mr-1" />
              Reply
            </button>
            <button className="flex items-center text-sm text-text dark:text-darkText hover:text-main">
              <Flag className="w-4 h-4 mr-1" />
              Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      username: 'JohnDoe',
      avatarUrl: 'https://via.placeholder.com/40',
      content: 'This is a great post! Thanks for sharing.',
      likes: 5,
      dislikes: 1,
    },
    {
      id: 2,
      username: 'JaneSmith',
      avatarUrl: 'https://via.placeholder.com/40',
      content: 'I have a question about this. Can you elaborate more on the second point?',
      likes: 3,
      dislikes: 0,
    },
  ]);

  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment: Comment = {
        id: comments.length + 1,
        username: 'CurrentUser',
        avatarUrl: 'https://via.placeholder.com/40',
        content: newComment,
        likes: 0,
        dislikes: 0,
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  return (
    <div className="font-base max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-heading mb-6">Comments</h2>
      {comments.map((comment) => (
        <CommentComponent key={comment.id} comment={comment} />
      ))}
      <form onSubmit={handleSubmit} className="mt-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-2 border-2 border-border dark:border-darkBorder rounded-base bg-bg dark:bg-darkBg text-text dark:text-darkText"
          rows={3}
        />
        <button
          type="submit"
          className="mt-2 border-border dark:border-darkBorder dark:bg-secondaryBlack dark:text-darkText shadow-light dark:shadow-dark cursor-pointer rounded-base border-2 bg-white px-4 py-2 text-center text-sm font-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none sm:text-base dark:hover:shadow-none"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
