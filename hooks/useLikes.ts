import { useState, useEffect } from "react";

export function useLikes () {
    const [likeMovies, setLikeMovies] = useState<number[]>([]);
    
    // 데이터베이스에 저장되어 있는 좋아요 목록을 가져온다.
    useEffect(() => {
        const id = localStorage.getItem("id");

        async function getLikes () {
            const res = await fetch("/api/likes", {
                method: "POST",
                body: JSON.stringify({ action:"getLikeMovies", user: {user_id: id} }),
            });
            const data = await res.json();
            setLikeMovies(data.likes ?? []);
        };

        getLikes();
    }, []);

    // 좋아요 클릭 시 하트 이미지 변화 함수
    async function toggleHeart ( movieId: number) {
        const id = localStorage.getItem("id");

        if ( id ) {
            if ( likeMovies.includes(movieId) ) {
                await fetch(`/api/likes?user_id=${id}&movie_id=${movieId}`, {method: "DELETE"});
                setLikeMovies(prev => prev.filter(id => id !== movieId));
            } else {
                await fetch('/api/likes', {
                    method: "POST",
                    body: JSON.stringify({ action: "postLikeMovies", user: {user_id: id, movie_id: movieId}}),
                });
                setLikeMovies(prev => [...prev, movieId]);
            };
        } else {
            alert("로그인 후 이용해주세요.");
        };
    }

    return { likeMovies, toggleHeart };
}
