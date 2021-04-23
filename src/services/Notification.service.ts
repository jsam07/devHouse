import { logger } from '../utils/logger';
import { Notification } from '../interfaces/prisma.models';
import PrismaDatabase from '../database/Prisma.database';
import DatabaseException from '../exceptions/DatabaseException';

const { database } = PrismaDatabase;

export default class NotificationService {
    public static async notifyUser(message: string, userId: number): Promise<void> {
        try {
            await database.notification.create({
                data: {
                    message,
                    userId,
                },
            });
            logger.info(`Notified user: ${userId}`);
        } catch (error) {
            logger.error(error);
            throw new DatabaseException('notifyUser');
        }
    }

    public static async getUserNotifications(email: string): Promise<Notification[]> {
        try {
            // Get all notifications (seen or not)
            const notifications = await database.notification.findMany({
                where: {
                    user: { email },
                    // seen: false,
                },
            });

            // Update notifications to seen
            logger.info(`Notified user: ${email}`);
            await database.notification.updateMany({
                data: { seen: true },
                where: { user: { email } },
            });

            logger.info(`Returning notifications for ${email}`);
            return notifications;
        } catch (error) {
            logger.error(error);
            throw new DatabaseException('getUserNotifications');
        }
    }
}
