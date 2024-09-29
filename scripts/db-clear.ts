import { DataSource } from 'typeorm';
import { AppDataSource } from './data-source';

async function clearDatabase() {
    // DataSource 초기화
    const dataSource: DataSource = await AppDataSource.initialize();
    const queryRunner = dataSource.createQueryRunner();

    try {
        // 트랜잭션 시작 (필요할 경우)
        await queryRunner.startTransaction();

        // public 스키마에서 테이블 목록을 가져옴 (PostgreSQL 기준)
        const tables = await queryRunner.query(
            `SELECT tablename FROM pg_tables WHERE schemaname='public';`
        );

        // 각 테이블을 삭제
        for (const table of tables) {
            await queryRunner.query(`DROP TABLE IF EXISTS "${table.tablename}" CASCADE;`);
        }

        // 트랜잭션 커밋
        await queryRunner.commitTransaction();

        console.log('모든 테이블이 성공적으로 삭제되었습니다.');
    } catch (error) {
        // 에러 발생 시 트랜잭션 롤백
        await queryRunner.rollbackTransaction();
        console.error('데이터베이스 초기화 실패:', error);
    } finally {
        // QueryRunner 해제 및 DataSource 종료
        await queryRunner.release();
        await dataSource.destroy();
    }
}

clearDatabase().catch(error => console.error('데이터베이스 삭제 중 오류 발생:', error));
