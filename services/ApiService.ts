import axios, { AxiosInstance, AxiosPromise } from 'axios';

import { IForm } from '~/models/Form';
import { ILink } from '~/models/Link';
import { IRedirect } from '~/models/Redirect';

export class ApiService {
  axios: AxiosInstance;

  constructor(base_url: string) {
    this.axios = axios.create({
      baseURL: base_url,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getArchivedLinks = async (): Promise<{ data: ILink[] }> => {
    return (await this.axios.get<{ data: ILink[] }>('/api/links?status=archived')).data;
  };

  getLinks = async (): Promise<{ data: ILink[] }> => {
    return (await this.axios.get<{ data: ILink[] }>('/api/links')).data;
  };

  getLink = async (id: string): Promise<{ link: ILink }> => {
    return (await this.axios.get<{ link: ILink }>(`/api/links/${id}`)).data;
  };

  createLink = async (link: Partial<ILink>): Promise<{ link: ILink }> => {
    return (await this.axios.post<{ link: ILink }>('/api/links', link)).data;
  };

  updateLink = async (link: Partial<ILink> & Pick<ILink, 'id'>): Promise<{ link: ILink }> => {
    return (await this.axios.put<{ link: ILink }>(`/api/links/${link.id}`, link)).data;
  };

  deleteLink = async (id: string): Promise<{ link: ILink }> => {
    return (await this.axios.delete<{ link: ILink }>(`/api/links/${id}`)).data;
  };

  getForms = async (): Promise<{ data: IForm[] }> => {
    return (await this.axios.get<{ data: IForm[] }>('/api/forms')).data;
  };

  getForm = async (id: string): Promise<{ form: IForm }> => {
    return (await this.axios.get<{ form: IForm }>(`/api/forms/${id}`)).data;
  };

  createForm = async (form: Partial<IForm>): Promise<{ form: IForm }> => {
    return (await this.axios.post<{ form: IForm }>('/api/forms', form)).data;
  };

  updateForm = async (form: Partial<IForm> & Pick<IForm, 'id'>): Promise<{ form: IForm }> => {
    return (await this.axios.put<{ form: IForm }>(`/api/forms/${form.id}`, form)).data;
  };

  deleteForm = async (id: string): Promise<{ form: IForm }> => {
    return (await this.axios.delete<{ form: IForm }>(`/api/forms/${id}`)).data;
  };

  getRedirects = async (): Promise<{ data: IRedirect[] }> => {
    return (await this.axios.get<{ data: IRedirect[] }>('/api/redirects')).data;
  };

  getRedirect = async (id: string): Promise<{ redirect: IRedirect }> => {
    return (await this.axios.get<{ redirect: IRedirect }>(`/api/redirects/${id}`)).data;
  };

  createRedirect = async (redirect: Partial<IRedirect>): Promise<{ redirect: IRedirect }> => {
    return (await this.axios.post<{ redirect: IRedirect }>('/api/redirects', redirect)).data;
  };

  updateRedirect = async (
    redirect: Partial<IRedirect> & Pick<IRedirect, 'id'>
  ): Promise<{ redirect: IRedirect }> => {
    return (
      await this.axios.put<{ redirect: IRedirect }>(`/api/redirects/${redirect.id}`, redirect)
    ).data;
  };

  deleteRedirect = async (id: string): Promise<{ redirect: IRedirect }> => {
    return (await this.axios.delete<{ redirect: IRedirect }>(`/api/redirects/${id}`)).data;
  };
}
