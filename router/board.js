const router = require('express').Router();
const boardRepository = require('../repository/boardRepository');
const commentRepository = require('../repository/commentRepository');
const likePickRepository = require('../repository/likePickRepository');
const { parseAccessToken } = require('../middleware/authenticator');

router.post('/', async(req, res) => {
    const board = req.body;
    const parseToken = parseAccessToken(req.headers.authorization);
    const [result] = await boardRepository.insert(board, parseToken);

    if (result) {
        res.json({ result, message: '게시글이 작성 되었습니다.'});
    } else {
        res.status(500).send('게시글 생성 실패했습니다.');
    }
});

router.put('/:id', async(req, res) => {
    const board = req.body;
    const { id } = req.params;
    const [result] = await boardRepository.update(board, id);

    if (result) {
        res.json({ result, message: '게시글이 수정 되었습니다.'});
    } else {
        res.status(500).send('게시글 수정 실패했습니다.');
    }
});

router.get('/:id', async(req, res) => {
    const { id } = req.params
    const [result] = await boardRepository.readOneBoard(id);

    if (result) {
        res.json({ result, message: '게시글을 읽었습니다.'});
    } else {
        res.status(500).send('게시글 읽기 실패했습니다.');
    }
});

router.get('/', async(req, res) => {
    const parseToken = parseAccessToken(req.headers.authorization);
    const [result] = await boardRepository.readBoards();

    if (result) {
        for (i = 0; i < result.length; i++) {
            const board_id = result[i].id;
            const count = await likePickRepository.countLike_pick(board_id);
            const rows = count[0];
            result[i].like_pick_count = rows[0]['count(*)'];
            
            const is_like_pick = await likePickRepository.findLike_pickByMember(board_id, parseToken);
            result[i].is_like_pick = !!is_like_pick[0][0];
        }

        res.json({ result, message: "게시판 조회완료"});
    } else {
        res.status(500).send('게시판 조회 실패');
    }
});

router.delete('/:id', async(req, res) => {
    const { id } = req.params
    const [result] = await boardRepository.deleteBoard(id);

    if (result) {
        res.json( { result, message: '게시글이 삭제 되었습니다.'});
    } else {
        res.status(500).send('게시글 삭제 실패했습니다.')
    }
});
// comment가 달려있는 게시글은 삭제가 되지않는다..!

router.post('/:board_id/comment', async(req, res) => {
    const board_id = req.params.board_id;
    const comment = req.body;
    const parseToken = parseAccessToken(req.headers.authorization);

    const [result] = await commentRepository.insert(comment, parseToken, board_id);

    if (result) {
        res.json( {result, message: '댓글작성 완료'});
    } else {
        res.status(500).send('댓글작성 실패');
    }
});

router.put('/:board_id/comment/:id', async(req, res) => {
    const { id } = req.params;
    const comment = req.body;

    const [result] = await commentRepository.put(comment, id);

    if (result) {
        res.json( {result, message: '댓글수정 완료'});
    } else {
        res.status(500).send('댓글수정 실패');
    }
});

router.delete('/:board_id/comment/:id', async(req, res) => {
    const { id } = req.params;
    
    const [result] = await commentRepository.deleteComment(id);

    if (result) {
        res.json( {result, message: '댓글삭제 완료'});
    } else {
        res.status(500).send('댓글삭제 실패');
    }
});

//좋아요
router.post('/:board_id/like_pick', async (req, res) => {
    const board_id = req.params.board_id;
    console.log('board_id', board_id);
    const parseToken = parseAccessToken(req.headers.authorization);
    console.log(parseToken.id);

    const [result] = await likePickRepository.findLike_pickByMember(board_id, parseToken);

        if (result.length > 0) {
            const delete_like_pick = await likePickRepository.deleteLike_pick(board_id, parseToken);
            res.json({ delete_like_pick, message: '좋아요 취소 완료' });
        } else {
            const insert_like_pick = await likePickRepository.insertLike_pick(board_id, parseToken);
            res.json({ insert_like_pick, message: '좋아요 등록 완료' });
        }
});

module.exports = router;

//게시글 1개 읽기
// app.get('/board/:id', async (req,res)=> {
//     const id = req.params.id;
//     try {
//         const conn = await connection();
        
//         const query = 'SELECT b.id,b.title,b.content,m.nickname,b.created_at FROM board as b LEFT JOIN member as m ON m.id=b.writer_id WHERE b.id=?';

//         // const [result] = await conn.execute('SELECT * FROM board Where id = ?', [id]);
//         const [result] = await conn.execute(query, [id]);
//         const [result2] = await conn.execute('SELECT * FROM comment WHERE board_id = ?', [id]);


//         res.json({resource:{ ...result[0], comment:result2}, message: "게시글 1개 읽기 완료"});
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('게시글 읽기 실패');
//     }
// });


//게시판경우는 여러상황이런지 typescript, docker,
//figma 대충그리고, 백엔드 -> 프론트

//질문커뮤니티(결제가있고, 선생님들이나오고 채팅 or 화상(라이브러리)
//문서화
