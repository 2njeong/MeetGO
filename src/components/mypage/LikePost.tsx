'use client';
import { useGetUserDataQuery, useGetUserLikePostQuery, useGetUserPostQuery } from '@/hooks/useQueries/useUserQuery';
import Image from 'next/image';
import Link from 'next/link';
import defaultImg from '@/utils/icons/defaultImg.jpg';

const LikePost = () => {
  const { data: user } = useGetUserDataQuery();
  const userId = user?.user_id ?? '';

  const likePostData = useGetUserLikePostQuery(userId);

  return (
    <>
      <div>
        <h2 className="font-semibold">좋아요한 글</h2>
        <p className="text-sm text-[#4B5563] mb-6">후기 게시판에서 좋아요한 글을 확인하세요.</p>
        <div className="max-w-[870px] w-full flex gap-4 flex-wrap justify-start mx-auto">
          {likePostData?.map((post: any) => (
            <Link
              href={`/review/${post.review_id}`}
              key={post.review_id}
              className="border border-[#E5E7EB] p-4 rounded-xl flex flex-col gap-4 flex-grow-0 w-[278px]"
            >
              <div className="relative w-full h-[150px]">
                <Image
                  src={post.image_urls && post.image_urls.length > 0 ? post.image_urls[0] : defaultImg}
                  alt="Post Image"
                  style={{ objectFit: 'cover' }}
                  fill={true}
                  sizes="500px"
                  priority={false}
                  className="rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold">{post.review_title}</p>
                <p className="overflow-ellipsis overflow-hidden text-sm text-nowrap">{post.review_contents}</p>
              </div>
            </Link>
          ))}
          <div className="m-auto h-[150px] flex items-center">
            {likePostData?.length === 0 && <p>아직 좋아요한 글이 없습니다.</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default LikePost;