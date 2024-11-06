import axios from "axios"
import { User } from "../src/types/User"
import { Answer } from "../src/types/Answer"
import { Session } from "../src/types/Sesssion"
import { Item } from "../src/types/Item"

const SERVER_URL = "http://localhost:3000"

export const api = () => {
    return {
        users() {
            return {
                async create(user: User): Promise<string> {
                    try {
                        const res = await axios({
                            method: 'post',
                            url: `${SERVER_URL}/users`,
                            headers: {},
                            data: {
                                user
                            }
                        });
                        return res?.data
                    } catch (error) {
                        console.log(error)
                        throw error
                    }
                },
                async verify(password: string): Promise<{ statusCode: number, message: string }> {
                    try {
                        const res = await axios({
                            method: 'post',
                            url: `${SERVER_URL}/users/login`,
                            headers: {},
                            data: {
                                password
                            }
                        });
                        return res?.data
                    } catch (error: any) {
                        if (error.response) {
                            return { statusCode: error.response.status, message: error.response.statusText }
                        } else {
                            return { statusCode: 500, message: 'Server error' }
                        }
                    }
                }
            }
        },
        sessions() {
            return {
                async getById(id: string): Promise<Session | null> {
                    try {
                        const res = await axios.get(`${SERVER_URL}/sessions/${id}`)
                        return res?.data
                    } catch (error) {
                        console.log(error)
                        return null;
                    }
                },
                async getByValue(route: string, value: string): Promise<Session[]> {
                    try {
                        const res = await axios.get(`${SERVER_URL}/sessions/${route}/${value}`)
                        return res?.data
                    } catch (error) {
                        console.log(error)
                        return [];
                    }
                },
                async deleteOne(session: Session): Promise<void> {
                    try {
                        await axios.delete(`${SERVER_URL}/sessions/${session._id}`)
                    } catch (error) {
                        console.log(error)
                        throw error
                    }
                },
                async add(session: Session): Promise<string> {
                    try {
                        const res = await axios({
                            method: 'post',
                            url: `${SERVER_URL}/sessions`,
                            headers: {},
                            data: {
                                session
                            }
                        });

                        return res?.data
                    } catch (error) {
                        console.log(error)
                        return ''
                    }
                },
                async join(sessionId: string, user: User): Promise<string> {
                    try {
                        const res = await axios({
                            method: 'patch',
                            url: `${SERVER_URL}/sessions/${sessionId}/join`,
                            headers: {},
                            data: {
                                user
                            }
                        });

                        return res?.data
                    } catch (error) {
                        console.log(error)
                        return ''
                    }
                },
                async addItem(sessionId: string, item: Item): Promise<string> {
                    try {
                        const res = await axios({
                            method: 'patch',
                            url: `${SERVER_URL}/sessions/${sessionId}/item`,
                            headers: {},
                            data: {
                                item
                            }
                        });

                        return res?.data
                    } catch (error) {
                        console.log(error)
                        return ''
                    }
                }
            }
        },
        answers() {
            return {
                async getAll(): Promise<Answer[]> {
                    try {

                        const res = await axios.get(`${SERVER_URL}/answers`)
                        console.log(res?.data);

                        return res?.data
                    } catch (error) {
                        console.log(error);
                        throw error
                    }
                },
                async addAnswers(answers: Answer[]): Promise<() => number> {
                    try {
                        const res = await axios({
                            method: 'post',
                            url: `${SERVER_URL}/answers`,
                            headers: {},
                            data: {
                                answers
                            }
                        });
                        console.log(res?.data);

                        return res?.data.count
                    } catch (error) {
                        console.log(error);
                        throw error
                    }
                }
            }
        }
    }
}
