import { number, string } from 'prop-types';

export type LKVideo = {
    id: number;
    draft: boolean;
    tags: string;
    views: number;
    m3u8: string;
    caption: string | null;
    description: string | null;
    duration: number;
    likes_total: number;
    comments_total: number;
    event_id: number;
    created_at: string;
    publish_at: string;
    thumbnail_url: string;
    thumbnail_url_small: string;
};
export type LKVideoMap = { [index: string]: LKVideo };

export type LKEvent = {
    created_at: string;
    description: string | null;
    draft: string;
    end_time: string;
    full_name: string;
    id: number;
    is_live: number;
    is_public: number;
    likes_total: number;
    logo_small_url: string;
    logo_thumbnail_url: string;
    logo_url: string;
    owner_account_id: number;
    short_name: string;
    start_time: string;
    tags: string;
    viewer_count: number;
};
export type LKEventMap = { [index: string]: LKEvent };

export type LSEvent = {
    id: number;
    logo: {
        url: string;
        thumbnailUrl: string;
        smallUrl: string;
    };
    description: string | null;
    fullName: string;
    shortName: string | null;
    ownerAccountId: number;
    viewerCount: number;
    createdAt: string;
    startTime: string | null;
    endTime: string | null;
    isLive: boolean;
    draft: boolean;
    likes: {
        total: number;
    };
    tags: string[];
    isPublic: boolean | null;
    isSearchable: boolean | null;
    viewerCountVisible: boolean | null;
    postCommentsEnabled: boolean | null;
    liveChatEnabled: boolean | null;
    isEmbeddable: boolean | null;
    isPasswordProtected: boolean | null;
    isWhiteLabeled: boolean | null;
    embedRestriction: string | null;
    embedRestrictionWhitelist: string | null;
    embedRestrictionBlacklist: string | null;
};

export type LSEventMap = { [index: string]: LSEvent };

export type LSVideo = {
    id: number;
    draft: boolean;
    views: number;
    likes: {
        total: number
    };
    comments: {
        total: number;
    };
    caption: string;
    description: string;
    duration: number;
    eventId: number;
    createdAt: string;
    publishAt: string;
    thumbnailUrl: string;
    thumbnailUrlSmall: string;
    m3u8: string;
    tags: string[];
};

export type LSVideoMap = { [index: string]: LSVideo };
