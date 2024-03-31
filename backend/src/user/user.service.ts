import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';
import { Request } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  /**
   * Creates a new user based on the provided registration data.
   * @param registerUserDto - The data for user registration.
   * @returns The created user.
   * @throws {ConflictException} - If a user with the provided email already exists.
   */
  public async create(registerUserDto: RegisterUserDto): Promise<User> {
    const { email, firstName, lastName, password } = registerUserDto;
    const lowerEmail = email.toLowerCase();

    const existingUser = await this.userModel.findOne({ email: lowerEmail });
    if (existingUser) {
      throw new ConflictException('User with email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const savedUser = await this.userModel.create({
      firstName,
      lastName,
      email: lowerEmail,
      password: hashedPassword,
    });

    return savedUser;
  }

  /**
   * Finds a user by their email address.
   * @param email - The email address of the user to find.
   * @returns The user object.
   * @throws {NotFoundException} - If the user with the provided email is not found.
   */
  public async findOne(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException(`User with email not found`);
    }
    return user;
  }

  /**
   * Retrieves user data for the authenticated user.
   * @param req - The request object containing user information from the JWT token.
   * @returns User data.
   * @throws {NotFoundException} - If the authenticated user is not found.
   */
  public async getUserData(request: Request): Promise<User> {
    const payload = await this.authService.extractUserFromToken(request);
    const lowerEmail = payload.email.toLowerCase();
    const user = await this.userModel.findOne({ email: lowerEmail });
    if (!user) {
      throw new NotFoundException(`User with email not found`);
    }
    return user;
  }

  /**
   * Subscribes a user to the newsletter.
   * @param email - The email address of the user to subscribe.
   * @returns The user object with the newsletter subscription status.
   * @throws {NotFoundException} - If the user with the provided email is not found.
   * @throws {ConflictException} - If the user is already subscribed.
   */
  public async subscribeToNewsletter(email: string): Promise<User> {
    const lowerEmail = email.toLowerCase();
    const userInDb = await this.userModel.findOne({ email: lowerEmail });
    if (!userInDb) {
      throw new NotFoundException(`User with email not found`);
    }
    if (userInDb?.isSubscribed) {
      throw new ConflictException('User Already subscribed');
    }
    // Update user's subscription status and return the updated user
    const userWithNewsletterSubscribed = await this.userModel.findOneAndUpdate(
      { email: lowerEmail },
      { isSubscribed: true },
      { new: true },
    );
    return userWithNewsletterSubscribed as User;
  }
}
