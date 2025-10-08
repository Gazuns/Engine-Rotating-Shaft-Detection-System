import { getList } from '../controller/curd';
import { SuccessModel } from '../model/dataModel';
export const handleCurdRouter = (req, res) => {
    const method = req.method;
    const id = req.query.id;
    if (method === 'GET' && req.path === '/api/test/curd/list') {
        const name = req.query.name || '';
        const keywords = req.query.keywords || '';
        const listData = getList();
        return new SuccessModel(listData, 'success');
    }
};
